procesos-proyecto-gjj-1
```
docker build . -t {image_name} (gcr.io/{project_id}/{instance_name}:{image_tag}) (e.g. gcr.io/phattv-ecommerce/phattv-ecommerce-backend:1.0.0 or docker build . -t gcr.io/evisa-198403/evisa:3.1.1)
```

```
(optional) docker run --name {container_name} --rm -d -p 80:80 {image_name}
```

```
gcloud auth login & choose your account
```

```
docker -- push {image_name}
```