package lt.riw.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lt.riw.customers.Customer;
import lt.riw.customers.CustomerRepository;

import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleRepository;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController

public class RestDataController {

	@Autowired
	private VehicleRepository vehRepo;

	@Autowired
	private CustomerRepository custRepo;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void upload(HttpServletRequest request,
			@RequestParam("vehicle") String jsonString, List<MultipartFile> file) throws IOException {
		Gson gson = new Gson();
		Vehicle vehicle = gson.fromJson(jsonString, Vehicle.class);
		// Request File
		MultipartHttpServletRequest mRequest;
		mRequest = (MultipartHttpServletRequest) request;
		Iterator<String> itr = mRequest.getFileNames();
		while (itr.hasNext()) {
			// New MultipartFile and making it a byte array to upload to database as a blob
			MultipartFile hexFile = mRequest.getFile(itr.next());
			byte[] hexFileBytes = hexFile.getBytes();
			vehicle.setHexFile(hexFileBytes);
			// New object with all of the form data
			// Saving to DB
			vehRepo.save(vehicle);
		}
	}
	/*
	 * @RequestMapping(value = "/check") public String showUser(){ List<Users>
	 * users = (List<Users>) userRepo.findAll(); Gson gson = new
	 * GsonBuilder().setPrettyPrinting().create(); String usersJson =
	 * gson.toJson(users); return usersJson; }
	 */
	@RequestMapping(value = "/insertcustomer", method = RequestMethod.POST)
	public String insertCustomer(@RequestParam("age") int custAge, @RequestParam("city") String custCity,
			@RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName) {
		custRepo.save(new Customer(firstName, lastName, custAge, custCity));
		return "Done";
	}

	@GetMapping("/showall")
	public ResponseEntity<List<Vehicle>> showAll() {
		List<Vehicle> list = (List<Vehicle>) vehRepo.findAll();
		return new ResponseEntity<List<Vehicle>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/asdasdasd", method = RequestMethod.GET)
	public String showAllVehicles() throws JsonGenerationException, JsonProcessingException, IOException {
		List<Vehicle> vehicles = (List<Vehicle>) vehRepo.findAll();
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String vehicleJson = gson.toJson(vehicles);
		return vehicleJson;
	}

	@RequestMapping(value = "/showone", method = RequestMethod.GET)
	public String showOne(@RequestParam(value = "id", required = true) int id) {
		String oneVehicle = "";
		Vehicle vehicles = vehRepo.findById(id);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		oneVehicle = gson.toJson(vehicles);
		return oneVehicle;
	}

	@RequestMapping(value = "/test")
	public void testResult() {
		Vehicle vhs = vehRepo.findById(1);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String result = gson.toJson(vhs);
		System.out.println(result);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public void updateOne(@RequestParam("model") String modelName) {
		Vehicle vehicleToUpdate = vehRepo.findById(1);
		vehicleToUpdate.setModelName(modelName);
		vehRepo.save(vehicleToUpdate);
	}

}