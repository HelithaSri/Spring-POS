package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author Helitha Sri
 * @created 6/29/2022 - 11:48 PM
 * @project Spring POS
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class OrderDetails {
    @Id
    private String oid;
    private String itemCode;
    private int qty;
    private double unitPrice;
    private double total;

    @ManyToOne
    @JoinColumn(name = "oid",referencedColumnName = "oid",insertable = false,updatable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "itemCode",referencedColumnName = "code",insertable = false,updatable = false)
    private Item items;
}
