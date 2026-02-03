# 🚀 AWS DevOps Implementation Plan - DigitalMEng

## Executive Summary

Complete infrastructure plan for deploying DigitalMEng on AWS with CI/CD, auto-scaling, and production-ready architecture.

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AWS CLOUD INFRASTRUCTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│   │ CloudFront  │────▶│     ALB     │────▶│    ECS      │                   │
│   │    (CDN)    │     │  (Load Bal) │     │  Fargate    │                   │
│   └─────────────┘     └─────────────┘     └──────┬──────┘                   │
│         │                                         │                          │
│         │              ┌─────────────────────────┼──────────────┐            │
│         │              │                         │              │            │
│         ▼              ▼                         ▼              ▼            │
│   ┌──────────┐   ┌──────────┐           ┌──────────┐    ┌──────────┐        │
│   │    S3    │   │   RDS    │           │ ElastiC  │    │  Secrets │        │
│   │ (Assets) │   │ Postgres │           │  ache    │    │ Manager  │        │
│   └──────────┘   └──────────┘           └──────────┘    └──────────┘        │
│                                                                               │
│   ┌──────────┐   ┌──────────┐           ┌──────────┐    ┌──────────┐        │
│   │ Cognito  │   │   SQS    │           │  Lambda  │    │CloudWatch│        │
│   │  (Auth)  │   │ (Queues) │           │ (Workers)│    │  (Logs)  │        │
│   └──────────┘   └──────────┘           └──────────┘    └──────────┘        │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ AWS Services Required

| Service | Purpose | Tier/Size |
|---------|---------|-----------|
| **ECS Fargate** | Container hosting | 2 vCPU, 4GB RAM |
| **RDS PostgreSQL** | Database | db.t3.medium |
| **ElastiCache Redis** | Caching/Sessions | cache.t3.micro |
| **S3** | Media storage | Standard |
| **CloudFront** | CDN | Standard |
| **ALB** | Load balancer | Application |
| **Cognito** | Authentication | Standard |
| **SQS** | Task queues | Standard |
| **Lambda** | Background workers | 512MB |
| **Secrets Manager** | API keys storage | Standard |
| **CloudWatch** | Monitoring/Logs | Standard |
| **Route 53** | DNS | Hosted zone |
| **ACM** | SSL certificates | Free |
| **ECR** | Docker registry | Standard |

---

## 📁 Project Structure for DevOps

```
DigitalMEng/
├── .github/
│   └── workflows/
│       ├── deploy-staging.yml      # Staging deployment
│       ├── deploy-production.yml   # Production deployment
│       └── pr-checks.yml           # PR validation
├── infrastructure/
│   ├── terraform/                  # Infrastructure as Code
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── modules/
│   │   │   ├── ecs/
│   │   │   ├── rds/
│   │   │   ├── elasticache/
│   │   │   ├── s3/
│   │   │   └── networking/
│   │   └── environments/
│   │       ├── staging.tfvars
│   │       └── production.tfvars
│   └── scripts/
│       ├── deploy.sh
│       ├── rollback.sh
│       └── health-check.sh
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.worker
│   └── docker-compose.prod.yml
└── .env.example
```

---

## 🔧 Phase 1: Foundation (Week 1-2)

### 1.1 Terraform Infrastructure Setup

```hcl
# infrastructure/terraform/main.tf

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "digitalmeng-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
module "vpc" {
  source = "./modules/networking"
  
  vpc_cidr = "10.0.0.0/16"
  environment = var.environment
}

# RDS PostgreSQL
module "rds" {
  source = "./modules/rds"
  
  instance_class = "db.t3.medium"
  database_name  = "digitalmeng"
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.private_subnet_ids
}

# ECS Cluster
module "ecs" {
  source = "./modules/ecs"
  
  cluster_name = "digitalmeng-${var.environment}"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.private_subnet_ids
}
```

### 1.2 Docker Configuration

```dockerfile
# docker/Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

---

## 🔧 Phase 2: CI/CD Pipeline (Week 2-3)

### 2.1 GitHub Actions - Production Deployment

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: digitalmeng
  ECS_SERVICE: digitalmeng-service
  ECS_CLUSTER: digitalmeng-production
  CONTAINER_NAME: digitalmeng-app

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -f docker/Dockerfile .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: infrastructure/ecs/task-definition.json
          service: ${{ env.ECS_SERVICE }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true
```

### 2.2 ECS Task Definition

```json
{
  "family": "digitalmeng-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "digitalmeng-app",
      "image": "ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/digitalmeng:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"}
      ],
      "secrets": [
        {"name": "DATABASE_URL", "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT:secret:digitalmeng/database"},
        {"name": "NEXTAUTH_SECRET", "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT:secret:digitalmeng/auth"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/digitalmeng",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

---

## 🔧 Phase 3: Database & Caching (Week 3)

### 3.1 RDS Setup

```hcl
# infrastructure/terraform/modules/rds/main.tf
resource "aws_db_instance" "main" {
  identifier           = "digitalmeng-${var.environment}"
  engine              = "postgres"
  engine_version      = "15.4"
  instance_class      = var.instance_class
  allocated_storage   = 100
  storage_encrypted   = true
  
  db_name  = var.database_name
  username = "digitalmeng_admin"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"
  
  multi_az               = var.environment == "production" ? true : false
  deletion_protection    = var.environment == "production" ? true : false
  skip_final_snapshot    = var.environment != "production"
}
```

### 3.2 ElastiCache Redis

```hcl
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "digitalmeng-${var.environment}"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  security_group_ids   = [aws_security_group.redis.id]
  subnet_group_name    = aws_elasticache_subnet_group.main.name
}
```

---

## 🔧 Phase 4: Background Workers (Week 4)

### 4.1 Lambda for AI Workers

```typescript
// infrastructure/lambda/autopilot-worker/index.ts
import { SQSEvent } from 'aws-lambda';
import { AutopilotManager } from './autopilot';

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const task = JSON.parse(record.body);
    
    switch (task.type) {
      case 'GENERATE_CONTENT':
        await AutopilotManager.generateContent(task.payload);
        break;
      case 'PUBLISH_CONTENT':
        await AutopilotManager.publishContent(task.payload);
        break;
      case 'SYNC_ROADMAP':
        await AutopilotManager.syncRoadmap(task.payload);
        break;
    }
  }
};
```

### 4.2 SQS Queues

```hcl
resource "aws_sqs_queue" "content_generation" {
  name                       = "digitalmeng-content-generation"
  delay_seconds             = 0
  max_message_size          = 262144
  message_retention_seconds = 86400
  visibility_timeout_seconds = 300
  
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 3
  })
}

resource "aws_sqs_queue" "dlq" {
  name = "digitalmeng-dlq"
}
```

---

## 📋 Implementation Timeline

| Week | Phase | Deliverables |
|------|-------|--------------|
| 1 | Foundation | VPC, Security Groups, IAM Roles |
| 2 | Containers | ECR, ECS Cluster, Task Definitions |
| 3 | Database | RDS, ElastiCache, Secrets Manager |
| 4 | CI/CD | GitHub Actions, Deployment Pipeline |
| 5 | Workers | Lambda, SQS, EventBridge |
| 6 | Monitoring | CloudWatch, Alerts, Dashboards |
| 7 | CDN & DNS | CloudFront, Route 53, SSL |
| 8 | Testing | Load Testing, Security Audit |

---

## 💰 Estimated Monthly Costs

| Service | Staging | Production |
|---------|---------|------------|
| ECS Fargate | $30 | $150 |
| RDS PostgreSQL | $30 | $120 |
| ElastiCache | $15 | $50 |
| S3 + CloudFront | $10 | $50 |
| Lambda | $5 | $20 |
| ALB | $20 | $40 |
| Others | $20 | $50 |
| **Total** | **~$130/mo** | **~$480/mo** |

---

## 🔐 Security Checklist

- [ ] VPC with private subnets
- [ ] Security groups properly configured
- [ ] RDS encryption at rest
- [ ] Secrets in AWS Secrets Manager
- [ ] IAM roles with least privilege
- [ ] CloudWatch log retention
- [ ] SSL/TLS everywhere
- [ ] WAF rules configured
- [ ] Backup strategy tested

---

## 🚀 Quick Start Commands

```bash
# 1. Initialize Terraform
cd infrastructure/terraform
terraform init

# 2. Plan changes
terraform plan -var-file=environments/production.tfvars

# 3. Apply infrastructure
terraform apply -var-file=environments/production.tfvars

# 4. Get outputs
terraform output

# 5. Deploy application
./infrastructure/scripts/deploy.sh production
```

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026
