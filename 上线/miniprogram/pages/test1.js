
function check(money, time) {
  if(money <= 500) return -1;
  if(money >= 50000) return -1;
  if(time < 0) return -1;
  if(time > 20) return -1;
  return 1;
}
module.exports = check;

