async function testFetch() {
    console.log('Testing fetch...');
    const response = await fetch('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    console.log('Status:', response.status);
    const buffer = await response.arrayBuffer();
    console.log('Buffer size:', buffer.byteLength);
}
testFetch().catch(console.error);
