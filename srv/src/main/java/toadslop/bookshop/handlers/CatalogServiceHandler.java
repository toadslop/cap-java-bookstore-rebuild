package toadslop.bookshop.handlers;

import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.handler.annotations.On;

import org.springframework.stereotype.Component;

import cds.gen.catalogservice.CatalogService_;
import cds.gen.catalogservice.AddReviewContext;

@Component
@ServiceName(CatalogService_.CDS_NAME)
public class CatalogServiceHandler implements EventHandler {

    @On(event = AddReviewContext.CDS_NAME)
    public void addReview() {
        System.out.println("Triggered the action!");
    }

}
