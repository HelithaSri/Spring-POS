package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/22/2022 - 2:25 PM
 * @project Spring POS
 */

public interface CustomerRepo extends JpaRepository<Customer, String> {
    boolean existsCustomerByIdOrName(String id, String name);

    List<Customer> searchCustomerByIdOrName(String id, String name);
}