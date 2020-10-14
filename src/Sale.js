import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import uuid from 'uuid/v4'

class Sale extends Component {
  state = {
    sale: {},
    loading: true
  }

  getData = async () => {
    const { id, viewedSale } = this.props

    await fetch(`https://fast-brushlands-09411.herokuapp.com/api/sales/${id}`)
      .then((response) => response.json())
      .then((sale) => {
        this.setState({ sale, loading: false })
        viewedSale(id)
      })
      .catch((err) => console.error(err))
  }

  async componentDidMount() {
    await this.getData()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ loading: true })
      await this.getData()
    }
  }

  itemTotal = (items) => {
    let total = 0
    for (let item of items) {
      total += item.price
    }
    return total.toFixed(2)
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='loaderContainer'>
          <ReactLoading type='spin' color='red' className='loader' />
        </div>
      )
    } else if (this.state.sale._id) {
      const { sale } = this.state
      return (
        <div>
          <h1>Sale: {sale._id}</h1>
          <h2>Customer</h2>
          <ListGroup>
            <ListGroupItem>
              <strong>email:</strong> {sale.customer.email}
            </ListGroupItem>

            <ListGroupItem>
              <strong>age:</strong> {sale.customer.age}
            </ListGroupItem>

            <ListGroupItem>
              <strong>satisfaction:</strong> {sale.customer.satisfaction}
            </ListGroupItem>
          </ListGroup>

          <h2>Items: ${this.itemTotal(sale.items)}</h2>

          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map(({ name, quantity, price }) => (
                <tr key={uuid()}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Unable to find Sale</h1>
          <p>id: {this.props.id}</p>
        </div>
      )
    }
  }
}

export default Sale;