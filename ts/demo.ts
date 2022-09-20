const delay = (ms: number) => new Promise<void>((resolve, _reject) => setTimeout(() => {
    resolve();
}, ms));

const loop = async () => {
    for (let i = 1; i <= 10; i++) {
        console.log(i);
        await delay(200);
    }
}

loop();

console.log(1);
setTimeout(() => {
    console.log(2);
    setTimeout(() => {
        setTimeout(() => {
            console.log(4);
            setTimeout(() => {
                console.log(5);
            }, 1000);
        }, 1000);
        console.log(3);
    }, 1000);
}, 1000)
