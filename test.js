const NS_PER_SEC = 1e9;
const hrtime = process.hrtime();
setTimeout(() => {
  const diff = process.hrtime(hrtime);
  console.log(diff[0] + '\n', diff[1] + '\n', diff[2] + '\n');
}, 5000);
