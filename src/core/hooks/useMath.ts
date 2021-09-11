export function useMath() {
  return {
    /**
    * Retorna um número aleatório dentro de um range.
    * Ex: 2021
    */
    random: (min = 0, max = 100) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  };
}
