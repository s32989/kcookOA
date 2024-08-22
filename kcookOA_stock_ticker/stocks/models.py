from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=10) # the max length of US stock tickers is 9?
    user = models.CharField(max_length=100)

class Alert(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    threshold = models.FloatField()
    alert_type = models.CharField(max_length=10)
