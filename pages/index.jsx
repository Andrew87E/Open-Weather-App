import { CityCards, CurrentCity, Jumbotron, Page } from "../components";

export default function Home() {
  return (
    <Page currentPage="Home" desc="Open Weather App">
      <Jumbotron />
      <CurrentCity />
      <CityCards />
    </Page>
  );
}
