from rest_framework import serializers

from space.models import Space


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'

    def validate(self, attrs):
        print(attrs)
        return super().validate(attrs)