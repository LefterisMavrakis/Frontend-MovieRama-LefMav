export default function useConfig() {
  const apiKey = "bc50218d91157b1ba4f142ef7baaa6a0";
  const postersBasePath = 'https://image.tmdb.org/t/p/original'


  
  const getApiKey = () => {
    return apiKey;
  }
  const getPostersBase = () => {
    return postersBasePath
  }


  return {
    getApiKey,
    getPostersBase
  };
}
