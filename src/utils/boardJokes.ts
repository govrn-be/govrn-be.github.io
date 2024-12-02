export const boardJokes = [
  "Looks like this agenda item got lost in the minutes...",
  "Even our AI couldn't find this page in the board pack",
  "This motion did not pass the quorum check",
  "The board has voted - this page doesn't exist",
  "This document is still pending approval"
];

export const getRandomJoke = () => {
  return boardJokes[Math.floor(Math.random() * boardJokes.length)];
};