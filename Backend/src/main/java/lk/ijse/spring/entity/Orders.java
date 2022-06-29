package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * @author Helitha Sri
 * @created 6/29/2022 - 5:46 PM
 * @project Spring POS
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Orders {
    @Id
    private String oid;
    private LocalDate date;
    private double discount;
    private double total;
    private double subTotal;
    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "customerID",referencedColumnName = "id",nullable = false)
    private Customer customerId;

    @OneToMany(mappedBy = "orders",cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;
}
