import ProductTable from "./components/ProductTable";
import FilterBar from "./components/FilterBar";
import NewProductButton from "./components/NewProductButton";
import Pagination from "./components/Pagination";
import Metrics from "./components/Metrics";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <p>I'm developing this site! It'll be ready ASAP</p>
      <FilterBar/>
      <NewProductButton/>
      <ProductTable/>
      <Pagination/>
      <Metrics/>
      <ProductForm/>
    </div>

  );
}

export default App;
