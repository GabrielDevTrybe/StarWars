const Fetch = async () => {
  const endPoint = 'https://swapi.dev/api/planets';
  const response = await fetch(endPoint);
  const { results } = await response.json();
  return results;
};

export default Fetch;
