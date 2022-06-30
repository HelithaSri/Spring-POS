package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/25/2022 - 2:13 AM
 * @project Spring POS
 */

public interface ItemService {

    void saveItem(ItemDTO itemDTO);

    void deleteItem(String itemCode);

    void updateItem(ItemDTO itemDTO);

    List<ItemDTO> searchItem(String code, String name);

    List<ItemDTO> getAllItems();

    String generateItemId();

    List<String> getAllItemIds();

    ItemDTO loadSelectedItemDetails(String code);
}
