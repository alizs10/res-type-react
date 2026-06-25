import Generator from "./components/generator/Generator"
import Layout from "./components/layout/Layout"
import { GeneratorProvider } from "./contexts/GeneratorContext"


function App() {

  return <Layout>
    <GeneratorProvider>
      <Generator />
    </GeneratorProvider>
  </Layout>

}

export default App
