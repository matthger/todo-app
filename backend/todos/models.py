from django.db import models

class Todo(models.Model):
    STATUS_CHOICES = [
        ('open', 'Offen'),
        ('in_progress', 'In Bearbeitung'),
        ('done', 'Erledigt'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
