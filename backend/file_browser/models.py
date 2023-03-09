from django.db import models

class FileBrowserNode(models.Model):
    """
    File System Node moodel
    """
    name = models.CharField('Name', max_length=100, db_index=True)
    is_directory = models.BooleanField('Directory?', default=True)
    language = models.CharField('Programing Language', max_length=25, blank=True, null=True)
    value = models.TextField('Value', blank=True, null=True)
    size = models.PositiveIntegerField('File Size', default=0)
    parent = models.ForeignKey(
        'self',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='children'
    )
    space = models.ForeignKey(
        "space.Space",
        on_delete=models.CASCADE,
        related_name='root_folder'
    )
    is_root = models.BooleanField('Root?', default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        unique_together = [['space', 'name']]

    def __str__(self):
        return self.name