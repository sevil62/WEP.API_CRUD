using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_CRUD.Models;
using WebApi_CRUD.Models.DTO;

namespace WebApi_CRUD.Controllers
{
    public class EmployeesController : ApiController
    {
        NorthwindEntities db = new NorthwindEntities();

       

        [HttpDelete]
        public IHttpActionResult DeleteEmployee(int id)
        {
            var employee = db.Employees.Find(id);
            if (employee != null)
            {
                db.Employees.Remove(employee);
                db.SaveChanges();
                return Json(EmployeeList());
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public List<EmployeeDTO> EmployeeList()
        {
            var employees = db.Employees.Select(x => new EmployeeDTO { Id = x.EmployeeID, Title = x.Title, FirstName = x.FirstName, LastName = x.LastName }).ToList();
            return employees;
        }

        [HttpPost]

        public IHttpActionResult AddEmployee(Employee employee)
        {
            db.Employees.Add(employee);
            db.SaveChanges();
            return Json(EmployeeList());
        }

        [HttpPut]

        public List<EmployeeDTO> UpdateEmployee(Employee employee)
        {
            if (employee!=null)
            {
                Employee toBeUpdated = db.Employees.Find(employee.EmployeeID);
                db.Entry(toBeUpdated).CurrentValues.SetValues(employee);
                db.SaveChanges();
                
            }
            return EmployeeList();


        }
    }
}
