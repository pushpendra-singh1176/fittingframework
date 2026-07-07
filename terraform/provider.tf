terraform {
    required_version = ">= 1.0.0"
    required_providers {
        azurerm = {
            source = "harshicorp / azurerm "
            version = "~> 3.0"
        }
    }
}
 
provider "azurerm" {
    features {}

}
