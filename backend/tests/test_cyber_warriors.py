"""
Cyber Warriors Feature - Backend API Tests
Tests for:
- GET /api/cyber-warriors/events - List events
- POST /api/cyber-warriors/events - Create event
- POST /api/cyber-warriors/register - Register for session
- GET /api/cyber-warriors/registrations - List registrations
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestCyberWarriorsEvents:
    """Cyber Warriors Events CRUD tests"""
    
    def test_get_events_endpoint_works(self):
        """Test GET /api/cyber-warriors/events returns 200"""
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/events")
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        print(f"SUCCESS: GET /api/cyber-warriors/events returned {len(response.json())} events")
    
    def test_create_event_and_verify(self):
        """Test POST /api/cyber-warriors/events creates an event"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "title": f"TEST_Event_{unique_id}",
            "description": "Test cyber safety workshop for automated testing purposes",
            "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            "date": "2025-03-15"
        }
        
        # Create event
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/events", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["description"] == payload["description"]
        assert data["image"] == payload["image"]
        assert data["date"] == payload["date"]
        assert "id" in data
        assert data["is_active"] == True
        
        event_id = data["id"]
        print(f"SUCCESS: Created event with ID: {event_id}")
        
        # Verify event appears in list
        list_response = requests.get(f"{BASE_URL}/api/cyber-warriors/events")
        events = list_response.json()
        event_ids = [e["id"] for e in events]
        assert event_id in event_ids
        print("SUCCESS: Event verified in list")
    
    def test_delete_event(self):
        """Test DELETE /api/cyber-warriors/events/{id}"""
        # First create an event to delete
        payload = {
            "title": "TEST_Event_ToDelete",
            "description": "This event will be deleted in test",
            "image": "https://example.com/image.jpg",
            "date": "2025-04-01"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/cyber-warriors/events", json=payload)
        assert create_response.status_code == 200
        event_id = create_response.json()["id"]
        
        # Delete the event
        delete_response = requests.delete(f"{BASE_URL}/api/cyber-warriors/events/{event_id}")
        assert delete_response.status_code == 200
        
        # Verify event is gone from list
        list_response = requests.get(f"{BASE_URL}/api/cyber-warriors/events")
        events = list_response.json()
        event_ids = [e["id"] for e in events]
        assert event_id not in event_ids
        print(f"SUCCESS: Event {event_id} deleted successfully")


class TestCyberWarriorsRegistration:
    """Cyber Warriors Registration tests"""
    
    def test_register_individual(self):
        """Test POST /api/cyber-warriors/register for individual"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "registration_type": "self",
            "name": f"TEST_Individual_{unique_id}",
            "contact_number": "+91 9876543210",
            "email": f"test_individual_{unique_id}@example.com",
            "preferred_date": "2025-03-20",
            "message": "Test registration from pytest"
        }
        
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/register", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["registration_type"] == "self"
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["status"] == "pending"
        assert "id" in data
        
        print(f"SUCCESS: Individual registration created with ID: {data['id']}")
    
    def test_register_organization(self):
        """Test POST /api/cyber-warriors/register for organization"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "registration_type": "organization",
            "name": f"TEST_Contact_{unique_id}",
            "organization_name": f"TEST_School_{unique_id}",
            "organization_type": "school",
            "contact_number": "+91 9876543211",
            "email": f"test_org_{unique_id}@example.com",
            "preferred_date": "2025-03-25",
            "message": "Test organization registration"
        }
        
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/register", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["registration_type"] == "organization"
        assert data["organization_name"] == payload["organization_name"]
        assert data["organization_type"] == payload["organization_type"]
        assert data["status"] == "pending"
        
        print(f"SUCCESS: Organization registration created with ID: {data['id']}")
    
    def test_register_organization_types(self):
        """Test all organization types work"""
        org_types = ["school", "college", "corporate", "ngo", "other"]
        
        for org_type in org_types:
            unique_id = str(uuid.uuid4())[:8]
            payload = {
                "registration_type": "organization",
                "name": f"TEST_Contact_{org_type}_{unique_id}",
                "organization_name": f"TEST_Org_{org_type}",
                "organization_type": org_type,
                "contact_number": "+91 9876543212",
                "email": f"test_{org_type}_{unique_id}@example.com"
            }
            
            response = requests.post(f"{BASE_URL}/api/cyber-warriors/register", json=payload)
            assert response.status_code == 200
            assert response.json()["organization_type"] == org_type
            print(f"SUCCESS: Organization type '{org_type}' registration works")
    
    def test_get_registrations(self):
        """Test GET /api/cyber-warriors/registrations"""
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/registrations")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        
        # Check that our test registrations are there
        test_regs = [r for r in data if r["name"].startswith("TEST_")]
        assert len(test_regs) > 0
        print(f"SUCCESS: Found {len(test_regs)} test registrations")
    
    def test_delete_registration(self):
        """Test DELETE /api/cyber-warriors/registrations/{id}"""
        # First create a registration to delete
        payload = {
            "registration_type": "self",
            "name": "TEST_ToDelete_Registration",
            "contact_number": "+91 9876543213",
            "email": "test_delete@example.com"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/cyber-warriors/register", json=payload)
        assert create_response.status_code == 200
        reg_id = create_response.json()["id"]
        
        # Delete the registration
        delete_response = requests.delete(f"{BASE_URL}/api/cyber-warriors/registrations/{reg_id}")
        assert delete_response.status_code == 200
        
        print(f"SUCCESS: Registration {reg_id} deleted successfully")


class TestCyberWarriorsValidation:
    """Test validation and edge cases"""
    
    def test_register_missing_required_fields(self):
        """Test registration fails without required fields"""
        # Missing name
        payload = {
            "registration_type": "self",
            "contact_number": "+91 9876543210",
            "email": "test@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/register", json=payload)
        assert response.status_code == 422  # Validation error
        print("SUCCESS: Registration correctly rejects missing required fields")
    
    def test_event_description_min_length(self):
        """Test event description minimum length validation"""
        payload = {
            "title": "TEST_Event",
            "description": "Short",  # Less than 10 chars
            "image": "https://example.com/image.jpg"
        }
        
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/events", json=payload)
        assert response.status_code == 422
        print("SUCCESS: Event correctly rejects short description")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
