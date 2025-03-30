from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Avaliacao(models.Model):
    corneta = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='realiza_avaliacao',
        db_column='id_corneta', 
        verbose_name='Corneta'
    )
    avaliado = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='recebe_avaliacao',        
        db_column='id_avaliado',
        verbose_name='Avaliado'
    )
    nota_geral = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], 
        verbose_name='Nota Geral'
    )

    class Meta:
        unique_together = ('corneta', 'avaliado')
        db_table = 'avaliacoes'
        verbose_name = 'Avaliação'
        verbose_name_plural = 'Avaliações'

    def __str__(self):
        return f"{self.corneta} avaliou {self.avaliado} com nota {self.nota_geral}"