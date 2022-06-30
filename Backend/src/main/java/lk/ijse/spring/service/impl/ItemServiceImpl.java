package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/25/2022 - 2:13 AM
 * @project Spring POS
 */

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveItem(ItemDTO itemDTO) {
        if (!repo.existsById(itemDTO.getCode())) {
            repo.save(mapper.map(itemDTO, Item.class));
        } else {
            throw new RuntimeException("Item Already Exist");
        }
    }

    @Override
    public void deleteItem(String itemCode) {
        if (repo.existsById(itemCode)) {
            repo.deleteById(itemCode);
        } else {
            throw new RuntimeException("Please check the Item Code... No Such Item..!");
        }
    }

    @Override
    public void updateItem(ItemDTO itemDTO) {
        if (repo.existsById(itemDTO.getCode())) {
            repo.save(mapper.map(itemDTO, Item.class));
        } else {
            throw new RuntimeException("Please check the Item Code... No Such Item to Update..!");
        }
    }

    @Override
    public List<ItemDTO> searchItem(String code, String name) {
        if (repo.existsItemByCodeOrDescription(code, name)) {
            return mapper.map(repo.searchItemByCodeOrDescription(code, name), new TypeToken<List<ItemDTO>>() {
            }.getType());
        } else {
            throw new RuntimeException("No Item For " + code + ", " + name + " ..!");
        }
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return mapper.map(repo.findAll(), new TypeToken<List<ItemDTO>>() {
        }.getType());
    }

    @Override
    public String generateItemId() {
        long count = repo.count();
        String id = "I00-000";

        if (count != 0) {
            String generateItemId = repo.generateItemId();
            int tempId = Integer.parseInt(generateItemId.split("-")[1]);
            tempId += 1;
            if (tempId < 10) {
                id = "I00-00" + tempId;
            } else if (tempId < 100) {
                id = "I00-0" + tempId;
            } else if (tempId < 1000) {
                id = "I00-" + tempId;
            }
        } else {
            id = "I00-000";
        }
        return id;
    }

    @Override
    public List<String> getAllItemIds() {
        if (repo.count() == 0) {
            List<String> arrayList = new ArrayList<>();
            arrayList.add("No Items Available");
            return arrayList;
        } else {
            List<String> allByCode = repo.loadItemIds();
            System.out.println(allByCode);
            return allByCode;
        }
    }

    @Override
    public ItemDTO loadSelectedItemDetails(String code) {
        return mapper.map(repo.loadSelectItemDetails(code), ItemDTO.class);
    }
}
