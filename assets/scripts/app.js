const ATTACK_VALUE = 10;
const OPPONENT_ATACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_MY_ATTACK = "MY_ATTACK";
const LOG_EVENT_MY_STRONG_ATTACK = "MY_STRONG_ATTACK";
const LOG_EVENT_OPPONENT_ATTACK = "OPPONENT_ATTACK";
const LOG_EVENT_MY_HEAL = "MY_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = Number(
  prompt("Maximum life for you and your opponent", "100")
);

let chosenMaxLife = enteredValue;
let battleLog = [];
let lastLoggedEntry;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentOpponentHealth = chosenMaxLife;
let currentMyHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const writeToLog = (ev, val, opponentHealth, myHealth) => {
  let logEntry = {
    event: ev,
    value: val,
    finalOpponentHealth: opponentHealth,
    finalMyHealth: myHealth,
  };
  if (ev === LOG_EVENT_MY_ATTACK) {
    logEntry.target = "OPPONENT";
  } else if (ev === LOG_EVENT_MY_STRONG_ATTACK) {
    logEntry.target = "OPPONENT";
  } else if (ev === LOG_EVENT_OPPONENT_ATTACK) {
    logEntry.target = "ME";
  } else if (ev === LOG_EVENT_MY_HEAL) {
    logEntry.target = "ME";
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalOpponentHealth: opponentHealth,
      finalMyHealth: myHealth,
    };
  }
  battleLog.push(logEntry);
};

const reset = () => {
  currentOpponentHealth = chosenMaxLife;
  currentMyHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
};

const endRound = () => {
  const intialPlayerHealth = currentMyHealth;
  const myDamage = dealMyDamage(OPPONENT_ATACK_VALUE);
  currentMyHealth -= myDamage;
  writeToLog(
    LOG_EVENT_OPPONENT_ATTACK,
    myDamage,
    currentOpponentHealth,
    currentMyHealth
  );

  if (currentMyHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentMyHealth = intialPlayerHealth;
    setPlayerHealth(intialPlayerHealth);
    alert("You would be dead but the bonus life saved you!");
  }

  if (currentOpponentHealth <= 0 && currentMyHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "I WON",
      currentOpponentHealth,
      currentMyHealth
    );
  } else if (currentMyHealth <= 0 && currentOpponentHealth > 0) {
    alert("You lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "OPPONENT WON",
      currentOpponentHealth,
      currentMyHealth
    );
  } else if (currentMyHealth <= 0 && currentOpponentHealth <= 0) {
    alert("You have a draw");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW",
      currentOpponentHealth,
      currentMyHealth
    );
  }

  if (currentOpponentHealth <= 0 || currentMyHealth <= 0) {
    reset();
  }
};

const attackOpponent = (mode) => {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent =
    mode === MODE_ATTACK ? LOG_EVENT_MY_ATTACK : LOG_EVENT_MY_STRONG_ATTACK;

  //   let maxDamage;
  //   let logEvent;
  //   if (mode === "ATTACK") {
  //     maxDamage = ATTACK_VALUE;
  //     logEvent = LOG_EVENT_MY_ATTACK;
  //   } else if (mode === "STRONG_ATTACK") {
  //     maxDamage = STRONG_ATTACK_VALUE;
  //     logEvent = LOG_EVENT_MY_STRONG_ATTACK;
  //   }

  const opponentDamage = dealOpponentDamage(maxDamage);
  currentOpponentHealth -= opponentDamage;
  writeToLog(logEvent, opponentDamage, currentOpponentHealth, currentMyHealth);
  endRound();
};

const attackHandler = () => {
  attackOpponent(MODE_ATTACK);
};

const strongAttackHandler = (mode) => {
  attackOpponent(MODE_STRONG_ATTACK);
};

const healMeHandler = () => {
  let healValue;
  if (currentMyHealth >= chosenMaxLife - HEAL_VALUE) {
    alert(`You can't heal to more than your max intial health`);
    healValue = chosenMaxLife - currentMyHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increaseMyHealth(healValue);
  currentMyHealth += healValue;
  writeToLog(
    LOG_EVENT_MY_HEAL,
    healValue,
    currentOpponentHealth,
    currentMyHealth
  );
  endRound();
};

const printLogHandler = () => {
  //   let i = 0;
  //   while (i < 3) {
  //     console.log(i);
  //     i++;
  //   }
  //   let sum = 0;
  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 5; j > 2; j--) {
  //       sum = sum + j + i;
  //     }
  //   }
  //   console.log(sum);

  //   for (let i = 0; i < 3; i++) {
  //     console.log("-----");
  //   }

  //   for (let i = 10; i > 0; i--) {
  //     console.log("-----");
  //   }
  //   for (let i = 0; i < battleLog.length; i++) {
  //     console.log(battleLog[i]);
  //   }
  //let i = 0;
  //   for (const ele of battleLog) {
  //     console.log(ele);
  //     console.log(i);
  //     i++

  //   }
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;

      break;
    }
    i++;
  }
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healMeHandler);
logBtn.addEventListener("click", printLogHandler);
