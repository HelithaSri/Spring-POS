package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/22/2022 - 8:06 PM
 * @project Spring POS
 */

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if (!repo.existsById(customerDTO.getId())) {
            repo.save(mapper.map(customerDTO, Customer.class));
        } else {
            throw new RuntimeException("Customer Already Exist");
        }
    }

    @Override
    public void deleteCustomer(String customerID) {
        if (repo.existsById(customerID)) {
            repo.deleteById(customerID);
        } else {
            throw new RuntimeException("Please check the Customer ID... No Such Customer..!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        if (repo.existsById(customerDTO.getId())) {
            repo.save(mapper.map(customerDTO, Customer.class));
        } else {
            throw new RuntimeException("Please check the Customer ID... No Such Customer to Update..!");
        }
    }

    @Override
    public List<CustomerDTO> searchCustomer(String id, String name) {
        if (repo.existsCustomerByIdOrName(id,name)){
            return mapper.map(repo.searchCustomerByIdOrName(id,name),new TypeToken<List<CustomerDTO>>(){}.getType());
        }else {
            throw new RuntimeException("No Customer For " + id+", "+name + " ..!");
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(repo.findAll(), new TypeToken<List<CustomerDTO>>(){}.getType());
    }
}
