describe("redis-connect", () => {

  function sleep(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  const Redis = require("ioredis");
  const redisCli = new Redis({
    prot: 6379
  });

  test("setex 1s ", async () => {
    let value = "hello"
    await redisCli.setex('val', 1, value);
    let result = await redisCli.get("val");
    expect(result).toBe(value);
  });
  test("get val is null",async()=>{
    await sleep(1200);
    let result=await redisCli.get("val");
    expect(result).toBeNull();

  });
})




