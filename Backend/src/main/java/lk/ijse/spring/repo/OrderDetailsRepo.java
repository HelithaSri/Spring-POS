package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Helitha Sri
 * @created 6/30/2022 - 12:18 AM
 * @project Spring POS
 */

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, String> {
}
