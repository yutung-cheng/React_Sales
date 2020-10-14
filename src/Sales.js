import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Pagination } from 'react-bootstrap'
import ReactLoading from 'react-loading'

class Sales extends Component {
  state = {
    sales: [],
    currentPage: 1
  }

  getData = (page) => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://fast-brushlands-09411.herokuapp.com/api/sales?page=${page}&perPage=10`
      )
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err))
    })
  }

  async componentDidMount() {
    await this.getData(this.state.currentPage)
      .then((sales) => this.setState({ sales }))
      .catch((err) => console.error(err))
  }

  previousPage = async () => {
    const { currentPage } = this.state
    if (currentPage > 1) {
      await this.getData(currentPage - 1)
        .then((sales) => this.setState({ sales, currentPage: currentPage - 1 }))
        .catch((err) => console.error(err))
    }
  }

  nextPage = async () => {
    const { currentPage } = this.state
    this.getData(currentPage + 1)
      .then((sales) => this.setState({ sales, currentPage: currentPage + 1 }))
      .catch((err) => console.error(err))
  }

  render() {
    if (this.state.sales.length > 0) {
      return (
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Store Location</th>
                <th>Number of Items</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map((sale) => (
                <tr
                  key={sale._id}
                  onClick={() => this.props.history.push(`/Sale/${sale._id}`)}
                >
                  <td>{sale.customer.email}</td>
                  <td>{sale.storeLocation}</td>
                  <td>{sale.items.length}</td>
                  <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={this.previousPage} />
            <Pagination.Item>{this.state.currentPage}</Pagination.Item>
            <Pagination.Next onClick={this.nextPage} />
          </Pagination>
        </div>
      )
    } else
      return (
        <div className='loaderContainer'>
          <ReactLoading type='spin' color='red' className='loader' />
        </div>
      )
  }
}

export default withRouter(Sales)