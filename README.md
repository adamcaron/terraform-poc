# Terraform Test App

Input terraform configurations into the frontend, such as
```
provider "aws" {
  access_key = "ACCESS_KEY_HERE"
  secret_key = "SECRET_KEY_HERE"
  region     = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0d729a60"
  instance_type = "t2.micro"
}
```

and watch the infrastructure spin up.

Enter your own access and secret keys, of course.

See provier-specific documentation here: [https://www.terraform.io/docs/providers/](https://www.terraform.io/docs/providers/)

## Up and Running

 - `git clone git@github.com:adamcaron/terraform-test.git`
 - `npm i`
 - `npm start`

Navigate to [localhost:3000/](http://localhost:3000/).