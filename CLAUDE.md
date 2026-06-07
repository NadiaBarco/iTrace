# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**iTrace** is a platform that centralizes import information for people and SMEs in Argentina who want to import products without wasting time or money. It simulates the full import process end-to-end.

The core value proposition: given a product a user wants to import, iTrace returns cost estimates, logistics options, required permits/licenses (national, provincial, municipal), supplier info, quality and risk assessments, and a full import simulation with a shopping-cart-style summary.

## Key Domain Concepts

- **Import simulation**: Users search for a product, select quantities, and the system simulates the import — showing supplier options from different countries, costs, logistics, taxes, and required documentation.
- **Regulatory compliance**: The platform searches for applicable state, national, and provincial/municipal permits and licenses per product (sourced from ARCA/AFIP customs regime and related databases).
- **Sourcing/Scraping**: Products are sourced via B2B web indexing/scraping with filters. Supplier ranking is based on user ratings and ease of paperwork/services.
- **Shopping cart model**: Users can add multiple products to a cart and get a consolidated report covering costs, quality, risks, taxes, and required certificates — separated by supplier, courier, and country of origin.

## Inputs / Outputs

**Input**: Product name (search bar), desired quantity, user profile (existing licenses/permits).

**Output**: Per-product import simulation showing:
- Supplier options with pricing
- Logistics options and costs
- Applicable taxes and customs regime
- Required permits and certificates
- Risk report (by supplier, courier, country of origin)
- Final total cost estimate report (triggered by "Finish Simulation" action)

## Known Edge Cases & Constraints

- Products that cannot enter Argentina (import restrictions)
- Products requiring export permits from the origin country
- Pharmaceutical/regulated products requiring additional licenses
- Expected errors: product not found, insufficient stock, empty cart, invalid links

## Spec Location

Full project specification: `specs/proyecto.md`
