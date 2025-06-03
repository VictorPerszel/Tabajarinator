from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Rating(models.Model):
    rater = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='rater',
        db_column='id_rater', 
        verbose_name='Rater'
    )
    rated = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='rated',        
        db_column='id_rated',
        verbose_name='Rated'
    )
    overall = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], 
        verbose_name='Overall Rating'
    )

    class Meta:
        unique_together = ('rater', 'rated')
        db_table = 'ratings'
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'

    def __str__(self):
        return f"{self.rater} avaliou {self.rated} com nota {self.overall}"