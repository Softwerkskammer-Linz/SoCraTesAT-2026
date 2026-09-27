---
title: "Let's talk about Data Mesh"
day: 2
time: "12:00"
room: "15-06"
confusion: "medium-high"
---

Discussion topics:

* What is a Data Mesh?
* Does it really exist?
* How come I have never heard of it?
* Why should I care about having structured, traceable, observable data products with public contracts? 

Data Mesh is a movement for bringing software development approaches and capabilities to the data practice. It acknowledges fundamental scalability ceiling that data warehouses have - you can burn money for the promise of unlimited storage, but you can't throw cash at an unmaintainable schema. The quality demands that we set for software have been traditionally overlooked in the data practice, but are now enforceable through self-service data tooling and correct organizational structure.

A few components that make a Data Mesh possible, along with popular open source options.

* metadata catalog - DataHub - discover available data products, assets, ownership, and lineage
* schema contracts -dbt - versioned sql with enforceable contracts
* data federation - Trino - distributed query engine - give each domain their own data warehouse(s) and perform cross-catalog querying
* business intelligence (dashboards) - Superset 

Other noteable mentions:

* Airbyte - data ingestion. ecosystem of custom connectors for common commercial/saas platforms, allows teams to replicate the data internally instead of relying on constant REST api access.
* Temporal - durable execution framework for running airbyte, dbt, or custom workflows

Thank you for participation and interesting questions <3

[Get In Touch](https://linktr.ee/iyamg)
