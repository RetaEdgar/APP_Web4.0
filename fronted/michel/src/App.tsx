import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserForm from './module/user/UserForm'
import ProductData from './module/product/ProductData'
import OrderData from './module/order/OrderData'
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/user">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/order">Órdenes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/user" element={<UserForm />} />
        <Route path="/products" element={<ProductData />} />
        <Route path="/order" element={<OrderData />} />
      </Routes>
    </Router>
  )
}

export default App
