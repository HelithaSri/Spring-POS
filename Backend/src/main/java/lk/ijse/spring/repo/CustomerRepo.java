package lk.ijse.spring.repo;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/22/2022 - 2:25 PM
 * @project Spring POS
 */

public interface CustomerRepo extends JpaRepository<Customer, String> {
    boolean existsCustomerByIdOrName(String id, String name);

    List<Customer> searchCustomerByIdOrName(String id, String name);

    @Query(value = "SELECT id FROM customer ORDER BY id DESC LIMIT 1", nativeQuery = true)
    String generateCustomerId();

    @Query(value = "SELECT id FROM customer", nativeQuery = true)
    List<String> loadCustomerIds();

    @Query(value = "SELECT * FROM customer WHERE id=?1", nativeQuery = true)
    Customer loadSelectCustomerDetails(String id);
}
