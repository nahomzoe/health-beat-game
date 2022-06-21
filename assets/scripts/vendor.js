const opponentHealthBar = document.getElementById("opponent-health");
const myHealthBar = document.getElementById("my-health");
const bonusLifeEl = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

function adjustHealthBars(maxLife) {
  opponentHealthBar.max = maxLife;
  opponentHealthBar.value = maxLife;
  myHealthBar.max = maxLife;
  myHealthBar.value = maxLife;
}

function dealOpponentDamage(damage) {
  const dealtDamage = Math.random() * damage;
  opponentHealthBar.value = +opponentHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealMyDamage(damage) {
  const dealtDamage = Math.random() * damage;
  myHealthBar.value = +myHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increaseMyHealth(healValue) {
  myHealthBar.value = +myHealthBar.value + healValue;
}

function resetGame(value) {
  myHealthBar.value = value;
  opponentHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  myHealthBar.value = health;
}
