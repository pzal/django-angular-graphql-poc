from users.models import User

admin = User.objects.create_superuser(email="admin@example.com", password="secret")
doe = User.objects.create_user(email="doe1@example.com", password="secret", access_level=1)
doe2 = User.objects.create_user(email="doe2@example.com", password="secret", access_level=2)
doe3 = User.objects.create_user(email="doe3@example.com", password="secret", access_level=3)
