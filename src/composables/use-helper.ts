export default function useHelper() {

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code! 
  const arrayTake = <T>(arr: T[], qty = 1) => [...arr].splice(0, qty)


  return {
    arrayTake
  };
}
