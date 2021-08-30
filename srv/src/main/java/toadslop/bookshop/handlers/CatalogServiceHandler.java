package toadslop.bookshop.handlers;

import com.sap.cds.ql.cqn.CqnAnalyzer;
import com.sap.cds.reflect.CdsModel;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.handler.annotations.On;

import org.springframework.stereotype.Component;

import cds.gen.catalogservice.CatalogService_;
import cds.gen.catalogservice.Reviews;
import cds.gen.catalogservice.AddReviewContext;

@Component
@ServiceName(CatalogService_.CDS_NAME)
public class CatalogServiceHandler implements EventHandler {

    private final CqnAnalyzer analyzer;

    CatalogServiceHandler(CdsModel model) {
        this.analyzer = CqnAnalyzer.create(model);
	}

    @On(event = AddReviewContext.CDS_NAME)
    public void addReview(AddReviewContext context) {
        System.out.println(context.getCqn());

        Reviews review = Reviews.create();
        review.setText(context.getTitle());
        review.setRating(context.getRating());
        review.setText(context.getText());

        context.setCompleted();
    }

}
