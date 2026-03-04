package com.act1.activity1.service;

import com.act1.activity1.dto.CreateProductRequest;
import com.act1.activity1.dto.UpdateProductRequest;
import com.act1.activity1.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(CreateProductRequest request);

    List<ProductResponse> findAll();

    ProductResponse findById(Long id);

    ProductResponse update(Long id, UpdateProductRequest request);

    void delete(Long id);
}