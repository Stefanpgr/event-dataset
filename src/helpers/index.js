/* eslint-disable import/prefer-default-export */
export const filterAndRemoveDuplicates = (events) => {
  const actors = events.map((event) => event.actor)
    .filter((v, i, a) => a.findIndex((t) => (t.id === v.id)) === i)

  return actors;
};
