const { Outlet } = require('../models')

class Controller {
  static outlets(req, res, next) {
    Outlet.findAll()
      .then(data => {
        res.status(202).json({ data })
      })
      .catch(next)
  }
  static outletById(req, res, next) {
    const id = +req.params.id
    Outlet.findOne({ where: { id } })
      .then(data => {
        if(!data) throw { name: 'OutletNotFound', message: 'Not Found' }
        res.status(200).json({ data })
      })
      .catch(next)
  }
  static addOutlet(req, res, next) {
    const AdminId = +req.userData.id
    const { name, description, category, image_url } = req.body
    const obj = { name, description, category, image_url, AdminId }
    Outlet.create(obj)
      .then(data => {
        res.status(201).json({ message: 'Outlet successfully added' })
      })
      .catch(next)
  }
  static editOutlet(req, res, next) {
    const id = +req.params.id
    const { name, description, category, image_url } = req.body
    const obj = { name, description, category, image_url }
    Outlet.update(obj, { where: { id } })
      .then(() => {
        return Outlet.findOne({ where: { id } })
      })
      .then(data => {
        if (!data) throw { name: 'OutletNotFound', message: 'Not Found' }
      })
      .catch(next)
  }
  static deleteOutlet(req, res, next) {
    const id = +req.params.id
    Outlet.findOne({ where: { id } })
      .then(data => {
        if(!data) throw { name: 'OutletNotFound', message: 'Not Found' }
        Outlet.destroy({ where: { id } })
        res.status(200).json({ message: 'Outlet successfully deleted', data })
      })
      .catch(next)
  }
}

module.exports = Controller