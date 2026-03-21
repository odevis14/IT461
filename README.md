
# IT461
SELECT *
FROM Orders
WHERE
order_id = {{input_orderid.text || 0}}
OR customer_name ILIKE {{'%' + input_customer.text + '%'}}
OR phone ILIKE {{'%' + input_phone.text + '%'}}
ORDER BY dropoff_date DESC
![](https://raw.githubusercontent.com/appsmithorg/appsmith/release/static/appsmith_logo_primary.png)

This app is built using Appsmith. Turn any datasource into an internal app in minutes. Appsmith lets you drag-and-drop components to build dashboards, write logic with JavaScript objects and connect to any API, database or GraphQL source.

![](https://raw.githubusercontent.com/appsmithorg/appsmith/release/static/images/integrations.png)

### [Github](https://github.com/appsmithorg/appsmith) • [Docs](https://docs.appsmith.com/?utm_source=github&utm_medium=social&utm_content=appsmith_docs&utm_campaign=null&utm_term=appsmith_docs) • [Community](https://community.appsmith.com/) • [Tutorials](https://github.com/appsmithorg/appsmith/tree/update/readme#tutorials) • [Youtube](https://www.youtube.com/appsmith) • [Discord](https://discord.gg/rBTTVJp)

##### You can visit the application using the below link

###### [![](https://assets.appsmith.com/git-sync/Buttons.svg) ](https://umb.appsmith.com/applications/69b86ef55ca3850fbb798080/pages/69b86ef55ca3850fbb798082) [![](https://assets.appsmith.com/git-sync/Buttons2.svg)](https://umb.appsmith.com/applications/69b86ef55ca3850fbb798080/pages/69b86ef55ca3850fbb798082/edit)
