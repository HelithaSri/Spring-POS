package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 12:17 AM
 * @project Spring POS
 */

public interface OrdersRepo extends JpaRepository<Orders,String> {

    @Query(value = "SELECT oid FROM orders ORDER BY oid DESC LIMIT 1", nativeQuery = true)
    String generateOrderId();

}
