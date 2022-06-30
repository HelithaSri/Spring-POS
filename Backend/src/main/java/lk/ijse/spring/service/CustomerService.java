package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/22/2022 - 8:06 PM
 * @project Spring POS
 */

public interface CustomerService {

    void saveCustomer(CustomerDTO customerDTO);

    void deleteCustomer(String customerID);

    void updateCustomer(CustomerDTO customerDTO);

    List<CustomerDTO> searchCustomer(String id, String name);

    List<CustomerDTO> getAllCustomers();

    String generateCustomerId();

    List<String> getAllCustomerIds();

    CustomerDTO loadSelectedCustomerDetails(String id);
}
