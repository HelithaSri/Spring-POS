package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 12:17 AM
 * @project Spring POS
 */

public interface OrdersRepo extends JpaRepository<Orders,String> {
}
