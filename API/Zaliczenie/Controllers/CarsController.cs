using Microsoft.AspNetCore.Mvc;
using Zaliczenie.DbServices;
using Zaliczenie.Models;

namespace Zaliczenie.Controllers
{
    [ApiController]
    [Route("api/cars")]
    public class CarsController : Controller
    {
        private readonly AppDbContext _context;

        public CarsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cars
        [HttpGet]
        public ActionResult<IEnumerable<Car>> GetCars()
        {
            var cars = _context.Cars.ToList();
            return Ok(cars);
        }

        // GET: api/cars/id
        [HttpGet("{id}")]
        public ActionResult<Car> GetCarById(int id)
        {
            var car = _context.Cars.Find(id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        // POST: api/cars
        [HttpPost]
        public ActionResult<Car> AddCar(Car car)
        {
            _context.Cars.Add(car);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCarById), new { id = car.Id }, car);
        }

        // PUT: api/cars/1
        [HttpPut("{id}")]
        public IActionResult UpdateCar(int id, Car updatedCar)
        {
            var car = _context.Cars.Find(id);

            if (car == null)
            {
                return NotFound();
            }

            car.Brand = updatedCar.Brand;
            car.Model = updatedCar.Model;
            car.Year = updatedCar.Year;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/cars/id
        [HttpDelete("{id}")]
        public IActionResult DeleteCar(int id)
        {
            var car = _context.Cars.Find(id);

            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
