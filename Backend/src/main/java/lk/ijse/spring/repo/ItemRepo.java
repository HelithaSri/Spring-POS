package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/25/2022 - 2:13 AM
 * @project Spring POS
 */

public interface ItemRepo extends JpaRepository<Item, String> {

    boolean existsItemByCodeOrDescription(String code, String name);

    List<Item> searchItemByCodeOrDescription(String code, String name);

    @Query(value = "SELECT code FROM item ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String generateItemId();
}
