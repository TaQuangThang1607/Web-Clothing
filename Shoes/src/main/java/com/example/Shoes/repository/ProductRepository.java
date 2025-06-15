package com.example.Shoes.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Shoes.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {



    @Query("SELECT p FROM Product p ORDER BY p.sold DESC")
    List<Product> findTopSoldProducts(@Param("limit") int limit);

    List<Product> findByQuantityLessThan(int threshold);
}
